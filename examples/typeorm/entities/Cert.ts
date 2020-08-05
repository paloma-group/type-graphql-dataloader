import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  RelationId,
} from "typeorm";
import { Employee } from "./Employee";
import { Base } from "./Base";
import { Lazy } from "../types/Lazy";
import { TypeormLoader } from "#/index";

@ObjectType()
@Entity()
export class Cert extends Base<Cert> {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [Employee])
  @ManyToMany((type) => Employee, (employee) => employee.certs, { lazy: true })
  @TypeormLoader((type) => Employee, (cert: Cert) => cert.employeeIds)
  employees: Lazy<Employee[]>;

  @Field((type) => [String])
  @RelationId((cert: Cert) => cert.employees)
  employeeIds: string[];
}
