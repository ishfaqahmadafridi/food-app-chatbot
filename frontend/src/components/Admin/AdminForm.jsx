import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdminForm = ({ 
  formData, 
  editingId, 
  loading, 
  imagePreview,
  onSubmit, 
  onChange, 
  onImageChange, 
  onCancel 
}) => {
  return (
    <form className="bg-white p-8 rounded-[15px] mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-[fadeIn_0.3s]" onSubmit={onSubmit}>
      <h2 className="mt-0 text-gray-800 mb-5 text-2xl font-semibold">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
      
      <div className="mb-5">
        <Label htmlFor="item-name">Item Name *</Label>
        <Input
          id="item-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="e.g., Cheese Burger"
          required
        />
      </div>

      <div className="mb-5">
        <Label htmlFor="item-image">Image</Label>
        <input
          id="item-image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-[#667eea]"
        />
        {imagePreview && (
          <div className="mt-2.5">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-150px h-150px object-cover rounded-lg border-2 border-gray-300"
            />
          </div>
        )}
      </div>

      <div className="mb-5">
        <Label htmlFor="item-price">Price *</Label>
        <Input
          id="item-price"
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          placeholder="e.g., 12.99"
          step="0.01"
          required
        />
      </div>

      <div className="mb-5">
        <Label htmlFor="item-category">Category *</Label>
        <Select name="category" value={formData.category} onValueChange={(value) => onChange({ target: { name: 'category', value } })}>
          <SelectTrigger id="item-category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Salad">Salad</SelectItem>
            <SelectItem value="Rolls">Rolls</SelectItem>
            <SelectItem value="Deserts">Deserts</SelectItem>
            <SelectItem value="Sandwich">Sandwich</SelectItem>
            <SelectItem value="Cake">Cake</SelectItem>
            <SelectItem value="Pure Veg">Pure Veg</SelectItem>
            <SelectItem value="Pasta">Pasta</SelectItem>
            <SelectItem value="Noodles">Noodles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-5">
        <Label htmlFor="item-description">Description</Label>
        <Textarea
          id="item-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Item description..."
          rows={4}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button 
          type="submit" 
          disabled={loading} 
          className="flex-1 py-3 px-6 border-0 rounded-lg text-base font-medium cursor-pointer bg-[#667eea] text-white transition-all hover:bg-[#5568d3] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 border-0 rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
