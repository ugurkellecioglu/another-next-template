import { pgTable, text } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  password: text("password").notNull().unique(),
})
