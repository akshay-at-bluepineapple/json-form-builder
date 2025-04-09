"use client";

import { useEffect, useState } from "react";
import FormBuilder from "../components/formbuilder/FormBuilder";
import type { FormSchema } from "../components/formbuilder/FormBuilder";

// const formSchema = {
//   submitApi: "/api/submit-form",
//   fields: [
//     { name: "name", label: "Name", type: "text", required: true, defaultValue:"akshay" },
//     { name: "email", label: "Email", type: "email", required: true },
//     { name: "age", label: "Age", type: "number" },
//     { name: "test", label: "test", type: "text" },
//     {
//       name: "gender",
//       label: "Gender",
//       type: "select",
//       options: ["Male", "Female", "Other"],
//       defaultValue: "Male"
//     },
//     {
//       name: "Category",
//       label:"Category",
//       type: "radio",
//       options: ["Male", "Female", "Other"],
//       defaultValue: "Female"
//     },
//   ],
// }satisfies FormSchema;

export default function Home() {
  const [schema, setSchema] = useState<FormSchema | null>(null);

  useEffect(() => {
    async function fetchSchema() {
      const res = await fetch("/api/form-schema");
      if (res.ok) {
        const data = await res.json();
        setSchema(data);
      }
    }

    fetchSchema();
  }, []);

  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Dynamic Form Builder</h1>
      {schema ? (
        <FormBuilder schema={schema} />
      ) : (
        <p className="text-gray-500">Loading schema...</p>
      )}
    </main>
  );
}
