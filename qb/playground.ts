import {reflection as $} from "edgedb";
import * as e from "./generated/example";

const HeroType = e.default.Hero;
const HeroRoot = $.toSet(e.default.Hero, $.Cardinality.One);
const Hero = $.makePathNode(HeroRoot, null);
const VillainRoot = $.toSet(e.default.Villain, $.Cardinality.One);
const Villain = $.makePathNode(VillainRoot, null);

console.log(
  e.schema.AnnotationSubject.__shape__.annotations.properties.value.target
);
console.log(
  e.schema.AnnotationSubject.__shape__.annotations.properties.value.cardinality
);
console.log(
  e.schema.AnnotationSubject.__shape__.annotations.properties.value.__kind__
);

console.log(HeroType);
console.log(HeroType.__name__);
console.log(HeroType.__shape__);
console.log(HeroType.__shape__.name);
console.log(HeroType.__shape__.villains);
console.log(HeroType.__shape__.villains.cardinality);
console.log(HeroType.__shape__.villains.target.__name__);
console.log(HeroType.__shape__.villains.properties);
console.log(`## Hero`);
console.log(Hero);
console.log(`## Hero.villains`);
console.log(Hero.villains);
console.log(`## Hero.villains`);
console.log(Hero.villains);
console.log(`## Hero.villains.__parent__`);
console.log(Hero.villains.__parent__);
console.log(`## Hero.villains.__parent__.linkName`);
console.log(Hero.villains.__parent__.linkName);
console.log(`## Hero.__parent__`);
console.log(Hero.__parent__);
console.log(`## Hero.__cardinality__`);
console.log(Hero.__cardinality__);
console.log(`## Hero.__element__`);
console.log(Hero.__element__);
console.log(`## Hero.__type__`);
console.log(Hero.__type__);
console.log(`## Hero.__type__.__cardinality__`);

console.log(Hero.__type__.__cardinality__);
console.log(`## Hero.__type__.__type__`);
console.log(Hero.__type__.__type__);
console.log(`## Hero.__type__.final`);
console.log(Hero.__type__.final);
console.log(`## Hero.__type__.is_abstract`);
console.log(Hero.__type__.is_abstract);
console.log(`## Hero.__cardinality__`);
console.log(Hero.__cardinality__);
console.log(`## Hero.id.__cardinality__`);
console.log(Hero.id.__cardinality__);
console.log(`## Hero.name.__cardinality__`);
console.log(Hero.name.__cardinality__);
console.log(`## Hero.secret_identity.__cardinality__`);
console.log(Hero.secret_identity.__cardinality__);
console.log(`## Hero.villains.__cardinality__`);
console.log(Hero.villains.__cardinality__);
console.log(`## Hero.villains.name.__cardinality__`);
console.log(Hero.villains.name.__cardinality__);
console.log(`## Hero.villains.name.__parent__.type.__element__`);
console.log(Hero.villains.name.__parent__.type.__element__);
console.log(`## Hero.villains.nemesis.secret_identity`);
console.log(Hero.villains.nemesis.secret_identity);
console.log(`## Hero.villains.nemesis.toEdgeQL()`);
console.log(Hero.villains.nemesis.toEdgeQL());
console.log(`## Hero.villains.name.toEdgeQL()`);
console.log(Hero.villains.name.toEdgeQL());
console.log(`## Hero.villains.nemesis.name.toEdgeQL()`);
console.log(Hero.villains.nemesis.name.toEdgeQL());
console.log(Villain.nemesis.id.__cardinality__);
