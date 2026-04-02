async function seedSuperAdmin() {
  try {
    const data = {
      name: "Kanak Ray",
      email: "kanakroy835@gmail.com",
      password: "kanakroy835",
      role: "super-admin",
    };
  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
}

seedSuperAdmin();
