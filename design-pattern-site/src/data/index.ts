import type { Pattern } from '@/types/pattern'
import { singleton } from './patterns/singleton'
import { factoryMethod } from './patterns/factory-method'
import { abstractFactory } from './patterns/abstract-factory'
import { builder } from './patterns/builder'
import { prototype } from './patterns/prototype'
import { adapter } from './patterns/adapter'
import { bridge } from './patterns/bridge'
import { composite } from './patterns/composite'
import { decorator } from './patterns/decorator'
import { facade } from './patterns/facade'
import { flyweight } from './patterns/flyweight'
import { proxy } from './patterns/proxy'
import { strategy } from './patterns/strategy'
import { mediator } from './patterns/mediator'
import { observer } from './patterns/observer'
import { command } from './patterns/command'
import { chainOfResponsibility } from './patterns/chain-of-responsibility'
import { state } from './patterns/state'
import { templateMethod } from './patterns/template-method'
import { iterator } from './patterns/iterator'
import { memento } from './patterns/memento'
import { interpreter } from './patterns/interpreter'
import { visitor } from './patterns/visitor'

const allPatterns: Pattern[] = [
  singleton,
  factoryMethod,
  abstractFactory,
  builder,
  prototype,
  adapter,
  bridge,
  composite,
  decorator,
  facade,
  flyweight,
  proxy,
  strategy,
  mediator,
  observer,
  command,
  chainOfResponsibility,
  state,
  templateMethod,
  iterator,
  memento,
  interpreter,
  visitor,
]

const patternMap = new Map<string, Pattern>()
allPatterns.forEach(p => patternMap.set(p.id, p))

export function getAllPatterns(): Pattern[] {
  return allPatterns
}

export function getPatternById(id: string): Pattern | undefined {
  return patternMap.get(id)
}

export function getPatternsByCategory(category: string): Pattern[] {
  return allPatterns.filter(p => p.category === category)
}

export function searchPatterns(query: string): Pattern[] {
  const q = query.toLowerCase()
  return allPatterns.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.simpleExplanation.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  )
}
