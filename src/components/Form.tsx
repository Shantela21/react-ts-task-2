import React, { useState, useEffect } from "react";
import Toast from "./utils/Toaster";

interface FormItem {
  title: string;
  link: string;
  tags: string;
  description: string;
}
export default function Form({ query = "" }: { query?: string }) {
  const [formData, setFormData] = useState<FormItem>({
    title: "",
    link: "",
    tags: "",
    description: "",
  });
  const [items, setItems] = useState<FormItem[]>([]);
  /* FILTERED ITEMS */
  const q = (query || "").trim().toLowerCase();
  const filteredItems = React.useMemo(() => {
    if (!q) return items;
    return items.filter((it) => {
      const bucket = [it.title, it.link, it.description || "", it.tags || ""]
        .join(" ")
        .toLowerCase();
      return bucket.includes(q);
    });
  }, [items, q]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("items");
      const saved = raw ? (JSON.parse(raw) as FormItem[]) : [];
      setItems(saved);
    } catch (err) {
      console.error("Could not parse saved items:", err);
      setItems([]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormItem;
    setFormData((prev) => ({ ...prev, [key]: value } as FormItem));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.link.trim()) {
      alert("Title and Link are required!");
      return;
    }
    if (editIndex !== null) {
      setItems((prev) => {
        const copy = [...prev];
        copy[editIndex] = formData;
        return copy;
      });
      setEditIndex(null);
      Toast("Updated successfully");
    } else {
      setItems((prev) => [...prev, formData]);
      Toast("Added successfully");
    }
    setFormData({ title: "", link: "", tags: "", description: "" });
  };
  const handleDelete = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this link?");
    if (!confirmed) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({ title: "", link: "", tags: "", description: "" });
    }
    Toast("Deleted successfully");
  };
  const handleEdit = (index: number) => {
    setFormData(items[index]);
    setEditIndex(index);
  };
  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit}>
        <h2 style={{paddingLeft:"10%"}}>ADD LINKS</h2>
        <input
          className="title"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <input
          className="link"
          type="text"
          name="link"
          placeholder="Link (url)"
          value={formData.link}
          onChange={handleChange}
        />
        <br />
        <input
          className="optional-tags"
          type="text"
          name="tags"
          placeholder="Optional Tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <br />
        <input
          className="description"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <button className="add-btn" type="submit">
          {editIndex !== null ? "UPDATE" : "ADD"}
        </button>
      </form>
      {filteredItems.length > 0 && (
        <table className="table" border={1}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Link</th>
              <th>Tags</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    link
                  </a>
                </td>
                <td>{item.tags}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="t-btn btn btn-edit"
                    type="button"
                    onClick={() => handleEdit(index)}
                  >
                    EDIT
                  </button>
                  <button
                    className="t-btn btn btn-delete"
                    type="button"
                    onClick={() => handleDelete(index)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
