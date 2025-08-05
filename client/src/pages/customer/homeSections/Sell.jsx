import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = ["Technology", "Furniture","Stationary","Kitchen", "Others"];

export default function Sell() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [items, setItems] = useState([
    {
      name: "Smartphone",
      price: 12000,
      category: "Technology",
      description: "Used for 6 months",
    },
    {
      name: "Vacuum Cleaner",
      price: 3500,
      category: "HouseHold",
      description: "Almost new",
    },
  ]);

  const toggleForm = () => {
    setFormData({ name: "", price: "", category: "", description: "" });
    setEditIndex(null);
    setOpen(!open);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing item
      const updated = [...items];
      updated[editIndex] = formData;
      setItems(updated);
    } else {
      // Add new item
      setItems([...items, formData]);
    }

    setFormData({ name: "", price: "", category: "", description: "" });
    setEditIndex(null);
    setOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      <Typography variant="h4" gutterBottom>
        My Listings
      </Typography>

      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">₹{item.price}</Typography>
                <Typography color="text.secondary">{item.category}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Sell Button */}
      <Button
        variant="contained"
        onClick={toggleForm}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          borderRadius: "50%",
          width: 56,
          height: 56,
          fontSize: 30,
          padding: 0,
          minWidth: 0,
        }}
      >
        +
      </Button>

      {/* Sell Form */}
      <Collapse in={open}>
        <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 500, mx: "auto" }}>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null ? "Edit Item" : "Sell New Item"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Item Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price (₹)"
              name="price"
              type="number"
              fullWidth
              margin="normal"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <TextField
              label="Category"
              name="category"
              select
              fullWidth
              margin="normal"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              fullWidth
            >
              {editIndex !== null ? "Update" : "List Item"}
            </Button>
          </form>
        </Paper>
      </Collapse>
    </Box>
  );
}
