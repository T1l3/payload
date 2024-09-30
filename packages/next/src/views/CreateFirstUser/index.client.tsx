'use client'
import type {
  ClientCollectionConfig,
  ClientUser,
  FormState,
  LoginWithUsernameOptions,
} from 'payload'

import {
  ConfirmPasswordField,
  Form,
  type FormProps,
  FormSubmit,
  PasswordField,
  RenderFields,
  useAuth,
  useConfig,
  useServerActions,
  useTranslation,
} from '@payloadcms/ui'
import React from 'react'

import { RenderEmailAndUsernameFields } from '../../elements/EmailAndUsername/index.js'

export const CreateFirstUserClient: React.FC<{
  initialState: FormState
  loginWithUsername?: false | LoginWithUsernameOptions
  userSlug: string
}> = ({ initialState, loginWithUsername, userSlug }) => {
  const {
    config: {
      routes: { admin, api: apiRoute },
      serverURL,
    },
    getEntityConfig,
  } = useConfig()

  const { payloadServerAction } = useServerActions()

  const { i18n, t } = useTranslation()
  const { setUser, user } = useAuth()

  const collectionConfig = getEntityConfig({ collectionSlug: userSlug }) as ClientCollectionConfig

  const onChange: FormProps['onChange'][0] = React.useCallback(
    async ({ formState: prevFormState }) => {
      const { state } = (await payloadServerAction({
        action: 'form-state',
        args: {
          collectionSlug: userSlug,
          formState: prevFormState,
          language: i18n.language,
          operation: 'create',
          schemaPath: `_${userSlug}.auth`,
        },
      })) as { state: FormState } // TODO: infer the return type

      return state
    },
    [userSlug, payloadServerAction, i18n],
  )

  const handleFirstRegister = (data: { user: ClientUser }) => {
    setUser(data.user)
  }

  return (
    <Form
      action={`${serverURL}${apiRoute}/${userSlug}/first-register`}
      initialState={initialState}
      method="POST"
      onChange={[onChange]}
      onSuccess={handleFirstRegister}
      redirect={admin}
      validationOperation="create"
    >
      <RenderEmailAndUsernameFields
        className="emailAndUsername"
        loginWithUsername={loginWithUsername}
        operation="create"
        readOnly={false}
      />
      <PasswordField
        autoComplete={'off'}
        field={{
          name: 'password',
          label: t('authentication:newPassword'),
          required: true,
        }}
      />
      <ConfirmPasswordField />
      <RenderFields
        fields={collectionConfig.fields}
        forceRender
        operation="create"
        path=""
        readOnly={false}
        schemaPath={userSlug}
      />
      <FormSubmit size="large">{t('general:create')}</FormSubmit>
    </Form>
  )
}
