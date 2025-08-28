import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

export const AddEquipmentForm = ({
  formData,
  categories,
  statusOptions,
  conditionOptions,
  handleInputChange,
  handleSelectChange,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Equipment Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter equipment name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select
          name="category"
          value={formData.category}
          onValueChange={(value) => handleSelectChange('category', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories
              .filter((cat) => cat !== 'All')
              .map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Equipment location"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) => handleSelectChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Condition</label>
        <Select
          name="condition"
          value={formData.condition}
          onValueChange={(value) => handleSelectChange('condition', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {conditionOptions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Equipment description"
          rows={3}
        />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Add Equipment</Button>
    </DialogFooter>
  </form>
);
