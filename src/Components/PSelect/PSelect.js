import React from "react";
// import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import Select from "react-select";
import "./PSelect.scss";

const PSelect = ({
  options,
  className,
  inputChange,
  customFilter,
  setChosenOption,
  chosenOptions,
  defaultValue,
  placeholder,
  multiple,
  isClearable,
  containerStyles,
}) => {
  return (
    <Grid container item xs={12} className="PSelect">
      <Grid item xs={12} style={containerStyles}>
        <Select
          className={className}
          filterOption={customFilter}
          onInputChange={inputChange}
          isClearable={isClearable}
          hideSelectedOptions
          options={options}
          isMulti={multiple}
          placeholder={placeholder || ""}
          value={chosenOptions}
          noOptionsMessage={() =>
            (multiple && chosenOptions?.length === options.length) ||
            (!multiple && options?.length === 1)
              ? "No more options"
              : "Loading..."
          }
          defaultValue={defaultValue || ""}
          onChange={(item, selectAction) => {
            const { action } = selectAction;
            if (!setChosenOption) return;
            switch (action) {
              case "clear":
                setChosenOption([]);
                break;
              case "select-option":
                setChosenOption(item);
                break;
              case "remove-value":
                if (!multiple) setChosenOption(null);
                else {
                  const item = selectAction.removedValue;
                  const aux = chosenOptions.filter(
                    (elem) => elem.value !== item.value
                  );
                  setChosenOption([].concat(aux));
                }
                break;
              default:
                break;
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

// PSelect.propTypes = {
// 	className: PropTypes.string,
// 	defaultValue: PropTypes.object,
// 	options: PropTypes.arrayOf(PropTypes.object),
// 	setChosenOption: PropTypes.func,
// 	placeholder: PropTypes.string,
// 	inputChange: PropTypes.func,
// 	customFilter: PropTypes.func,
// 	chosenOptions: PropTypes.oneOf([ PropTypes.object, PropTypes.array ]),
// 	multiple: PropTypes.bool,
// 	isClearable: PropTypes.bool,
// 	containerStyles: PropTypes.object
// };

export default PSelect;
