import { Select, Chip, SelectItem, Avatar, SelectProps } from '@nextui-org/react';
import React, { ForwardedRef, forwardRef } from 'react';

type SelectWithClipProps = {
  items: { id: string; name: string }[];
} & SelectProps<{ id: string; name: string }>;

const SelectWithClip = forwardRef((props: SelectWithClipProps, ref: ForwardedRef<HTMLSelectElement>) => {
  return (
    <Select
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
      {...props}
      items={props.items}
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      variant="bordered"
      isMultiline={true}
      classNames={{
        trigger: "min-h-unit-12 py-2",
      }}
      ref={ref}
    >
      {props.children}
    </Select>
  );
});

SelectWithClip.displayName = 'SelectWithClip';

export default SelectWithClip;