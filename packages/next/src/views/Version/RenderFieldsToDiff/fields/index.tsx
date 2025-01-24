import type { FieldTypes } from 'payload'

import type { DiffComponentProps } from './types.js'

import Iterable from './Iterable/index.js'
import Nested from './Nested/index.js'
import Relationship from './Relationship/index.js'
import Select from './Select/index.js'
import Tabs from './Tabs/index.js'
import Text from './Text/index.js'

export const diffComponents: Record<FieldTypes, React.FC<DiffComponentProps<any>>> = {
  array: Iterable,
  blocks: Iterable,
  checkbox: Text,
  code: Text,
  collapsible: Nested,
  date: Text,
  email: Text,
  group: Nested,
  join: null,
  json: Text,
  number: Text,
  point: Text,
  radio: Select,
  relationship: Relationship,
  richText: Text,
  row: Nested,
  select: Select,
  tabs: Tabs,
  text: Text,
  textarea: Text,
  ui: null,
  upload: Relationship,
}
