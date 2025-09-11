import React, { useState, useEffect } from "react";

  interface FormItem {
    title: string;
    link: string;
    tags: string;
    description: string;
  }

  export default function Form() {
    const [formData, setFormData] = useState<FormItem>({
      title: "",
      link: "",
      tags: "",
      description: "",
    });

    const [items, setItems] = useState<FormItem[]>([]);
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
      } else {
        setItems((prev) => [...prev, formData]);
      }

      setFormData({ title: "", link: "", tags: "", description: "" });
    };

    const handleDelete = (index: number) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
      if (editIndex === index) {
        setEditIndex(null);
        setFormData({ title: "", link: "", tags: "", description: "" });
      }
    };

    const handleEdit = (index: number) => {
      setFormData(items[index]);
      setEditIndex(index);
    };

    return (
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
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

        {items.length > 0 && (
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
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  </td>
                  <td>{item.tags}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="t-btn"
                      type="button"
                      style={{
                        backgroundColor: "#70ae6e",
                        marginBottom: "2%",
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                      onClick={() => handleEdit(index)}
                    >
                      EDIT
                    </button>
                    <button
                      className="t-btn"
                      type="button"
                      style={{
                        backgroundColor: "#f4743b",
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
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


