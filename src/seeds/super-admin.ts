import { AdminRole } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function seedSuperAdmin() {
  try {
    const data = {
      name: "Kanak Ray",
      email: "kanakroy835@gmail.com",
      password: "kanakroy835",
      role: AdminRole.SUPER_ADMIN,
    };

    const isAdminExists = await prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isAdminExists) {
      console.log("Super Admin already exists. Skipping seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdAdmin = await prisma.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    if (createdAdmin) {
      console.log("Super Admin seeded successfully.");
      return;
    }
  } catch (error) {
    console.error("Error seeding Super Admin:", error);
    process.exit(1);
  }
}

seedSuperAdmin();
