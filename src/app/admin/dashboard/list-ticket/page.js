'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/tickets.css'; // reuse the same styles
import {
  getAllPriceGroups,
  createPriceGroup,
  updatePriceGroup,
  deletePriceGroup,
} from '@/services/price';

const defaultForm = { age: '', price: '', group: '' };

function PriceGroups() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await getAllPriceGroups();
      setData(res.data.data);
    } catch (err) {
      console.error('Error fetching price groups:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePriceGroup(editingId, form);
      } else {
        await createPriceGroup(form);
      }
      setForm(defaultForm);
      setEditingId(null);
      fetchPrices();
    } catch (err) {
      console.error('Error saving price group:', err);
    }
  };

  const handleEdit = (item) => {
    setForm({ age: item.age, price: item.price, group: item.group });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this group?')) {
      try {
        await deletePriceGroup(id);
        fetchPrices();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <div className="tickets-container">
      <h1 style={{ color: '#fff' }}>Price Groups</h1>

      <form onSubmit={handleSubmit} className="price-form">
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          value={form.group}
          onChange={(e) => setForm({ ...form, group: e.target.value })}
          required
        >
          <option value="">Select Group</option>
          <option value="child">Child</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button onClick={() => { setForm(defaultForm); setEditingId(null); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Group</th>
            <th>Age</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((group, index) => (
            <tr key={group._id}>
              <td>{index + 1}</td>
              <td>{group.group}</td>
              <td>{group.age}</td>
              <td>{group.price}</td>
              <td>
                <button onClick={() => handleEdit(group)}>Edit</button>
                <button onClick={() => handleDelete(group._id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceGroups;
