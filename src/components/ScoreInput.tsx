import { Select, SelectItem } from '@nextui-org/react';
import React, { ForwardedRef, forwardRef } from 'react';

interface ScoreInputProps {
  label: string;
  selectedKeys: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  items: { id: string; name: string }[];
  formatValue?: boolean
}

const ScoreInput = forwardRef((props: ScoreInputProps, ref: ForwardedRef<HTMLSelectElement>) => {
  return (
    <Select
      selectedKeys={props.selectedKeys}
      name={props.name}
      onChange={props.onChange}
      aria-label={props.label}
      items={props.items}
      selectionMode="single"
      variant="bordered"
      isMultiline={true}
      classNames={{
        trigger: "min-h-unit-12 py-2",
      }}
      ref={ref}
      renderValue={(items) => (
        <>
          {items.map((item) => (
            <span
              key={item.key}
              className={`${props.formatValue && 'line-through'} ${Number(item.key) > 0 ? 'text-white' : ''}`}
            >
              {item.data?.name}
            </span>
          ))}
        </>
      )}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <span className='text-small'>{item.name}</span>
        </SelectItem>
      )}
    </Select>
  );
});

ScoreInput.displayName = 'ScoreInput';


export default ScoreInput;