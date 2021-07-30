import {
  BaseExpression,
  SomeObjectType,
  // BaseShapeExpression,
  // BaseShapeType,
  BaseTypeSet,
  computeObjectShape,
  ExpressionKind,
  LinkDesc,
  linkToTsType,
  makeSet,
  objectExprToSelectParams,
  ObjectType,
  ObjectTypeExpression,
  ObjectTypeShape,
  objectTypeToSelectParams,
  Poly,
  PropertyDesc,
  propToTsType,
  setToTsType,
  shapeElementToTsType,
  // shapeExprToSelectParams,
  // ShapeType,
  // simpleShape,
  TypeKind,
  TypeSet,
  typeutil,
  AnyPoly,
} from "reflection";
import {$pathify} from "./path";
import {toEdgeQL} from "./toEdgeQL";

// simple select
// object type select
export enum OrderByDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum OrderByEmpty {
  FIRST = "FIRST",
  Last = "Last",
}

type OrderBy = {
  expression: BaseExpression;
  direction: OrderByDirection | null;
  empty: OrderByEmpty | null;
};

export type $expr_ShapeSelect<
  Expr extends ObjectTypeExpression,
  Params extends object | null,
  Polys extends Poly[]
> = BaseExpression<{
  __element__: ObjectType<
    `${Expr["__element__"]["__name__"]}_variant`,
    Expr["__element__"]["__shape__"],
    Params,
    Polys
  >;
  __cardinality__: Expr["__cardinality__"];
}> & {
  __expr__: Expr;
  __kind__: ExpressionKind.ShapeSelect;
  __params__: Params;
  __polys__: Polys;
};

export type $expr_SimpleSelect<
  Expr extends BaseExpression = BaseExpression
> = BaseExpression<{
  __element__: Expr["__element__"];
  __cardinality__: Expr["__cardinality__"];
}> & {
  __expr__: Expr;
  __kind__: ExpressionKind.SimpleSelect;
};

// type mergeObjects<A, B> = typeutil.flatten<A & B>;
// type mergeObjectsVariadic<T> = T extends []
//   ? never
//   : T extends [infer U]
//   ? U
//   : T extends [infer A, infer B, ...infer Rest]
//   ? mergeObjectsVariadic<[mergeObjects<A, B>, ...Rest]>
//   : never;

// export function shape<
//   Type extends SomeObjectType,
//   Params extends objectTypeToSelectParams<Type>
// >(expr: {__element__: Type}, params: Params) {
//   return {type: expr.__element__, params};
// }

export function is<
  Expr extends ObjectTypeExpression,
  Params extends objectTypeToSelectParams<Expr["__element__"]>
>(expr: Expr, params: Params): Poly<Expr["__element__"], Params> {
  return {type: expr.__element__, params};
}

// export function select<
//   OT extends ObjectType,
//   Expr extends {__element__: OT} | {__element__: {__root__: OT}},
//   Params extends objectTypeToSelectParams<OT>
// >(expr: Expr, params: Params): $expr_ShapeSelect<Expr, Params>;
// export function select<
//   OT extends ObjectType,
//   Expr extends {__element__: {__root__: OT}},
//   Params extends objectTypeToSelectParams<OT>
// >(
//   expr: Expr,
//   params: Params
// ): Expr extends ObjectTypeExpression | BaseShapeExpression
//   ? $expr_ShapeSelect<Expr, Params>
//   : never;

// export function select<
//   Expr extends BaseShapeExpression,
//   Params extends shapeExprToSelectParams<Expr>
// >(expr: Expr, params: Params): $expr_ShapeSelect<Expr, Params>;

// objectExprToSelectParams;
// shapeExprToSelectParams;
// export function select<
//   Expr extends ObjectTypeExpression,
//   Params extends objectTypeToSelectParams<Expr["__element__"]>,
//   PolyExpr extends ObjectTypeExpression,
//   Polys extends Poly<PolyExpr>[]
// >(
//   expr: Expr,
//   params: Params,
//   ...polys: Polys
// ): $expr_ShapeSelect<Expr, Params, Polys>;
// export function select<Expr extends ObjectTypeExpression>(
//   expr: Expr
// ): $expr_ShapeSelect<Expr, {id: true}, []>;
// export function select<Expr extends BaseExpression>(
//   expr: Expr
// ): $expr_SimpleSelect<Expr>;
// export function select<
//   Expr extends BaseShapeExpression,
//   Params extends shapeExprToParams<Expr>
//   // PolyExpr extends ObjectTypeExpression,
//   // Polys extends Poly<PolyExpr>[]
// >(
//   expr: Expr,
//   params: Params
//   // ...polys: Polys
// ): Params; //$expr_ShapeSelect<Expr, Params>;
export function select<Expr extends ObjectTypeExpression>(
  expr: Expr
): $expr_ShapeSelect<Expr, {id: true}, []>;
export function select<Expr extends BaseExpression>(
  expr: Expr
): $expr_SimpleSelect<Expr>;
export function select<
  Expr extends ObjectTypeExpression,
  Params extends objectExprToSelectParams<Expr>,
  // variadic inference doesn't work properly
  // if additional constraints are placed on Polys
  Polys extends any[]
>(
  expr: Expr,
  params: Params,
  ...polys: Polys
): $expr_ShapeSelect<Expr, Params, Polys>;
export function select(expr: any, params?: any, ...polys: any[]) {
  if (!params) {
    return $pathify({
      __element__: (expr as ObjectTypeExpression).__element__,
      __cardinality__: (expr as ObjectTypeExpression).__cardinality__,
      __expr__: expr,
      __kind__: ExpressionKind.SimpleSelect,
      toEdgeQL,
    }) as any;
  }
  return $pathify({
    __element__: {
      __root__: (expr as ObjectTypeExpression).__element__,
      __expr__: expr,
      __kind__: TypeKind.shape,
      __name__: expr,
      __params__: params,
      __polys__: polys,
    } as any, //
    __cardinality__: (expr as ObjectTypeExpression).__cardinality__,
    __expr__: expr,
    __kind__: ExpressionKind.ShapeSelect,
    toEdgeQL,
  }) as any;
}
