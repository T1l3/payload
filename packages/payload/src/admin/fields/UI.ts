import type { MarkOptional } from 'ts-essentials'

import type { UIField, UIFieldClient } from '../../fields/config/types.js'
import type {
  ClientFieldBase,
  FieldClientComponent,
  FieldPaths,
  FieldServerComponent,
  ServerFieldBase,
} from '../types.js'

type UIFieldClientWithoutType = MarkOptional<UIFieldClient, 'type'>

type UIFieldBaseClientProps = Omit<FieldPaths, 'indexPath'>

export type UIFieldClientProps = ClientFieldBase<UIFieldClientWithoutType> & UIFieldBaseClientProps

export type UIFieldServerProps = ServerFieldBase<UIField, UIFieldClientWithoutType>

export type UIFieldClientComponent = FieldClientComponent<
  UIFieldClientWithoutType,
  UIFieldBaseClientProps
>

export type UIFieldServerComponent = FieldServerComponent<UIField, UIFieldClientWithoutType>
