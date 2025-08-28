import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Button } from "../../components/ui/Button";

// --- Define route ---
export const Route = createFileRoute("/__appLayout/messages")({
  component: Component,
});

// --- Define Zod schema ---
const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  profileVisibility: z.enum(["public", "connections", "private"]),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// --- Component ---
function Component() {
  const form = useForm<SettingsFormValues>({
    schema: settingsSchema,
    defaultValues: { emailNotifications: true, profileVisibility: "public" },
  });

  const handleSubmit = form.handleSubmit((values) => {
    console.log("Settings updated:", values);
    alert("Settings saved (mock)");
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between">
        <label>Email notifications</label>
        <input type="checkbox" {...form.register("emailNotifications")} />
      </div>

      <div>
        <label className="block mb-1">Profile visibility</label>
        <select
          {...form.register("profileVisibility")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="public">Public</option>
          <option value="connections">Connections</option>
          <option value="private">Private</option>
        </select>
      </div>

      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  );
}
