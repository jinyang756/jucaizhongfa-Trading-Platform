import React from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TestImports: React.FC = () => {
  return (
    <div>
      <h1>测试导入</h1>
      <Switch />
      <Label>测试标签</Label>
      <Slider />
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">选项1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TestImports;