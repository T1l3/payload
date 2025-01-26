'use client'
import type { ClientTab, TabsFieldClient } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { useTranslation } from '@payloadcms/ui'
import React from 'react'

import type { VersionTab } from '../../../buildVersionState.js'

import './index.scss'

import type { DiffComponentProps } from '../types.js'

import { DiffCollapser } from '../../DiffCollapser/index.js'
import { RenderFieldsToDiff } from '../../index.js'

const baseClass = 'tabs-diff'

export const Tabs: React.FC<DiffComponentProps<TabsFieldClient>> = (props) => {
  const { comparison, field, locales, version, versionField } = props
  return (
    <div className={baseClass}>
      {versionField.tabs.map((tab, i) => {
        const fieldTab = field.tabs?.[i]
        return (
          <div className={`${baseClass}__tab`} key={i}>
            {(() => {
              if ('name' in fieldTab && locales && fieldTab.localized) {
                // Named localized tab
                return locales.map((locale, index) => {
                  const localizedTabProps = {
                    ...props,
                    comparison: comparison?.[tab.name]?.[locale],
                    version: version?.[tab.name]?.[locale],
                  }
                  return (
                    <div className={`${baseClass}__tab-locale`} key={[locale, index].join('-')}>
                      <div className={`${baseClass}__tab-locale-value`}>
                        <Tab
                          key={locale}
                          {...localizedTabProps}
                          fieldTab={fieldTab}
                          locale={locale}
                          tab={tab}
                        />
                      </div>
                    </div>
                  )
                })
              } else if ('name' in tab && tab.name) {
                // Named tab
                const namedTabProps = {
                  ...props,
                  comparison: comparison?.[tab.name],
                  version: version?.[tab.name],
                }
                return <Tab fieldTab={fieldTab} key={i} {...namedTabProps} tab={tab} />
              } else {
                // Unnamed tab
                return <Tab fieldTab={fieldTab} key={i} {...props} tab={tab} />
              }
            })()}
          </div>
        )
      })}
    </div>
  )
}

type TabProps = {
  fieldTab: ClientTab
  tab: VersionTab
} & DiffComponentProps<TabsFieldClient>

const Tab: React.FC<TabProps> = ({
  comparison,
  diffComponents,
  fieldPermissions,
  fieldTab,
  locale,
  locales,
  tab,
  version,
  versionField,
}) => {
  const { i18n } = useTranslation()

  return (
    <DiffCollapser
      comparison={comparison}
      fields={fieldTab.fields}
      label={
        'label' in tab &&
        tab.label &&
        typeof tab.label !== 'function' && (
          <span>
            {locale && <span className={`${baseClass}__locale-label`}>{locale}</span>}
            {getTranslation(tab.label, i18n)}
          </span>
        )
      }
      locales={locales}
      version={version}
    >
      <RenderFieldsToDiff fields={tab.fields} />
    </DiffCollapser>
  )
}
