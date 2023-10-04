import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Combobox } from "@headlessui/react";

const AutocompleteInput = ({ name, label, options }) => {
  const { control } = useFormContext();
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Combobox
            open={filteredOptions.length > 0}
            onInput={(value) => setQuery(value)}
            onSelect={(value) => {
              setSelectedItem(value);
              field.onChange(value);
            }}
            value={selectedItem || field.value}
          >
            <Combobox.Input {...field} />
            {filteredOptions.length > 0 && (
              <Combobox.Options as="ul">
                {filteredOptions.map((option, index) => (
                  <Combobox.Option
                    key={index}
                    value={option}
                    as="li"
                    className="cursor-pointer"
                  >
                    {option}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        )}
      />
    </div>
  );
};

export default AutocompleteInput;
