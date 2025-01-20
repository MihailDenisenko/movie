import { Button, Drawer } from 'antd';
import { useState } from 'react';
import 'react';

export default function Drawere() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
