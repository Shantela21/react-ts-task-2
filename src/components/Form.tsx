import React, { useState, useEffect } from "react";
import Toast from "../utils/Toaster";
import {
  loadItems,
  saveItems,
  isValidUrl,
  debugLocalStorage,
  type FormItem,
} from "../utils/storage";

export default function Form({ query = "" }: { query?: string }) {
  const [formData, setFormData] = useState<FormItem>({
    title: "",
    link: "",
    tags: "",
    description: "",
  });
  const [linkError, setLinkError] = useState<string | null>(null);
  const [items, setItems] = useState<FormItem[]>([]);
  /* FILTERED ITEMS (preserve original indexes) */
  const q = (query || "").trim().toLowerCase();
  const filtered = React.useMemo(() => {
    const pairs = items.map((it, i) => ({ it, i }));
    if (!q) return pairs;
    return pairs.filter(({ it }) => {
      const bucket = [it.title, it.link, it.description || "", it.tags || ""]
        .join(" ")
        .toLowerCase();
      return bucket.includes(q);
    });
  }, [items, q]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    console.log("[Form] Component mounted, loading items");
    debugLocalStorage(); // Debug localStorage state
    const loadedItems = loadItems();
    console.log("[Form] Loaded items from storage:", loadedItems);
    setItems(loadedItems);
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    // Don't save on initial load to prevent overwriting existing data
    if (isInitialLoad) return;

    console.log("[Form] Items state changed, saving to localStorage:", items);
    saveItems(items);
  }, [items, isInitialLoad]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormItem;
    setFormData((prev) => ({ ...prev, [key]: value } as FormItem));
    if (name === "link") setLinkError(null);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Additional safeguard

    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }
    if (!formData.link.trim()) {
      setLinkError("Link is required");
      return;
    }
    if (!isValidUrl(formData.link.trim())) {
      setLinkError("Please enter a valid URL (with or without http/https).");
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
    setLinkError(null);
  };
  const handleDelete = (index: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this link?"
    );
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
        <h2 style={{ paddingLeft: "10%" }}>ADD LINKS</h2>
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
          aria-invalid={!!linkError}
        />
        {linkError && <div className="field-error">{linkError}</div>}
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
      {filtered.length > 0 ? (
        <div className="table-container">
          <table className="table" border={1} aria-label="Saved links table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Link</th>
                <th scope="col">Tags</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ it: item, i: origIndex }) => (
                <tr key={origIndex}>
                  <td>{item.title}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${item.title || item.link} in new tab`}
                    >
                      {item.title ? item.title : item.link}
                    </a>
                  </td>
                  <td>{item.tags}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="t-btn btn btn-edit"
                      type="button"
                      onClick={() => handleEdit(origIndex)}
                    >
                      EDIT
                    </button>
                    <button
                      className="t-btn btn btn-delete"
                      type="button"
                      onClick={() => handleDelete(origIndex)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Show helpful messages when there are no items or no matches
        !isInitialLoad &&
        (items.length === 0 ? (
          <div className="empty-message" style={{ 
            width: "100%",
            maxWidth: "1100px",
            margin: "16px auto",
            padding: "2rem",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "1.1rem",
            fontStyle: "italic",
            backgroundColor: "#f9fafb",
            borderRadius: "20px",
            border: "2px dashed #d1d5db"
          }}>
            📝 No links added yet. Start by adding your first link above!
          </div>
        ) : q ? (
          <div className="empty-message" style={{ 
            width: "100%",
            maxWidth: "1100px",
            margin: "16px auto",
            padding: "2rem",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "1.1rem",
            fontStyle: "italic",
            backgroundColor: "#f9fafb",
            borderRadius: "20px",
            border: "2px dashed #d1d5db"
          }}>
            🔍 No links found matching "{query}"
          </div>
        ) : null)
      )}
    </div>
  );
}
