"use client";

import React, { useState } from "react";

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

export interface FormSchema {
  submitApi: string;
  fields: Field[];
}

interface Props {
  schema: FormSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>;
}

const FormBuilder: React.FC<Props> = ({ schema }) => {
  const [loading, setLoading] = useState(false);

  const defaultInitialValues = schema.fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any>);

  const [formData, setFormData] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Record<string, any>>(defaultInitialValues);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("form data", formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(schema.submitApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert("Form submitted: " + JSON.stringify(result));
    } catch (error) {
      alert("Submission failed.");
      console.error("Error :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-sm border border-slate-200 rounded-lg p-5 "
    >
      {schema.fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">
            {field.label} {field.required && "*"}
          </label>
          {(() => {
            switch (field.type) {
              case "select":
                return (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="px-3 py-2 rounded w-full"
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                );

              case "radio":
                return (
                  <div className="space-y-1">
                    {field.options?.map((opt) => (
                      <label
                        key={opt}
                        className="w-4 flex gap-2 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600"
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={formData[field.name] === opt}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              case "checkbox":
                return (
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!formData[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                      className="w-4 h-4 border-gray-300 "
                    />
                    <span>{field.label}</span>
                  </label>
                );

              case "textarea":
                return (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    rows={4}
                    placeholder={field.label}
                  />
                );

              default:
                return (
                  <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                );
            }
          })()}
        </div>
      ))}
      <hr className="border-gray-300" />
      <div className="flex gap-3 justify-end">
        <button
          type="submit"
          disabled={loading}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
