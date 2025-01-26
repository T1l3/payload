import type { ArrayFieldClient, BlocksFieldClient, ClientField } from 'payload'

import { getUniqueListBy } from 'payload/shared'

import type { VersionField } from '../../buildVersionState.js'

/**
 * Get the fields for a row in an iterable field for comparison.
 * - Array fields: the fields of the array field, because the fields are the same for each row.
 * - Blocks fields: the union of fields from the comparison and version row,
 *   because the fields from the version and comparison rows may differ.
 */
export function getFieldsForRowComparison({
  comparisonRow,
  field,
  versionField,
  versionRow,
}: {
  comparisonRow: any
  field: ArrayFieldClient | BlocksFieldClient
  versionField: VersionField
  versionRow: any
}): { fields: ClientField[]; versionFields: VersionField[] } {
  let fields: ClientField[] = []
  let versionFields: VersionField[] = []

  if (field.type === 'array' && 'fields' in field) {
    fields = field.fields
    versionFields = versionField.fields
  }

  if (field.type === 'blocks') {
    if (versionRow?.blockType === comparisonRow?.blockType) {
      const matchedBlock = ('blocks' in field &&
        field.blocks?.find((block) => block.slug === versionRow?.blockType)) || {
        fields: [],
      }

      fields = matchedBlock.fields
      versionFields = versionField.fields // TODO
    } else {
      const matchedVersionBlock = ('blocks' in field &&
        field.blocks?.find((block) => block.slug === versionRow?.blockType)) || {
        fields: [],
      }
      const matchedComparisonBlock = ('blocks' in field &&
        field.blocks?.find((block) => block.slug === comparisonRow?.blockType)) || {
        fields: [],
      }

      fields = getUniqueListBy<ClientField>(
        [...matchedVersionBlock.fields, ...matchedComparisonBlock.fields],
        'name',
      )
      versionFields = versionField.fields // TODO
    }
  }

  return { fields, versionFields }
}
