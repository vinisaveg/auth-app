import { Migration } from '@mikro-orm/migrations';

export class Migration20201002120643 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "created_at" jsonb not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
