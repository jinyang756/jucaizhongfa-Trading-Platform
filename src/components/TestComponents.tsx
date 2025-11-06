import React from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

const TestComponents: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState([50]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <Label>开关测试</Label>
      </div>

      <div className="space-y-2">
        <Label>滑块测试: {value[0]}</Label>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    </div>
  );
};

export default TestComponents;
