import { getAllProducts } from "@/lib/repo/products";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <AdminCrudManager
      title="Solutions"
      description="The four service lines shown on the homepage and /solutions page."
      apiPath="/api/admin/products"
      initialItems={products}
      idField="id"
      idIsEditable={false}
      titleField="name"
      subtitleTemplate="{tag}"
      fields={[
        { name: "slug", label: "Slug (used in URL anchors, e.g. business-intelligence)", type: "text", required: true },
        { name: "name", label: "Name", type: "text", required: true },
        { name: "tag", label: "Tag", type: "text" },
        { name: "summary", label: "Summary", type: "textarea", required: true },
        { name: "bullets", label: "Bullet points", type: "tags" },
        {
          name: "color",
          label: "Accent color",
          type: "select",
          options: [
            { value: "blue", label: "Blue" },
            { value: "violet", label: "Violet" },
          ],
        },
      ]}
    />
  );
}
