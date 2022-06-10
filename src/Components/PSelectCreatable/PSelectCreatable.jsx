import React from "react";
import Select from "react-select/creatable";

const PSelectCreatable = ({
  options,
  chosenOptions,
  setChosenOption,
  inputChange,
  customFilter,
  defaultValue = null,
  placeholder = "",
  multiple = false,
  isClearable = false,
}) => {
  const customStyles = {
    control: () => ({
      display: "flex",
      backgroundColor: "#FCFCFD",
      boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.5)",
      background: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3) 1px,
        rgba(0, 0, 0, 0.3) 2px,
        rgba(0, 0, 0, 0.3) 3px
      )`,
      borderRadius: 5,
      borderStyle: "none",
      fontWeight: 600,
      minHeight: 40,
    }),
    menu: () => ({
      backgroundColor: "#FCFCFD",
      borderRadius: 5,
      borderStyle: "none",
      color: "#CDD1D9",
      position: "absolute",
      zIndex: 1000,
      width: "100%",
      marginTop: 10,
      paddingLeft: 3,
      paddingRight: 3,
    }),
    option: (_, state) => ({
      backgroundColor: state.isFocused ? "#E5E7F3" : "#FCFCFD",
      color: "#35353b",
      fontWeight: 600,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      justifySelf: "center",
      borderRadius: 5,
    }),
    dropdownIndicator: () => ({
      color: "#35353b",
      marginRight: 10,
      marginLeft: 10,
    }),
    clearIndicator: () => ({
      color: "#35353b",
      marginRight: 10,
      marginLeft: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      opacity: state.isDisabled ? 0.5 : 1,
      transition: "opacity 300ms",
    }),
    multiValue: () => ({
      backgroundColor: "#E5E7F3",
      justifyContent: "space-between",
      boxSizing: "border-box",
      marginTop: 3,
      marginBottom: 3,
      marginRight: 3,
      borderRadius: 5,
      display: "flex",
      minWidth: 100,
      padding: 10,
    }),
    multiValueLabel: () => ({
      color: "#35353b",
    }),
    menuPortal: () => ({
      backgroundColor: "green",
    }),
  };

  return (
    <Select
      styles={customStyles}
      filterOption={customFilter}
      onInputChange={inputChange}
      isClearable={isClearable}
      hideSelectedOptions
      options={options}
      isMulti={multiple}
      placeholder={placeholder || ""}
      value={chosenOptions}
      noOptionsMessage={() => "No more options"}
      defaultValue={defaultValue || ""}
      onChange={(item, selectAction) => {
        // Get action type
        const { action } = selectAction;
        // If no function provided, return
        if (!setChosenOption) return;

        switch (action) {
          case "clear":
            setChosenOption(item);
            break;

          case "select-option":
            setChosenOption(item);
            break;

          case "remove-value":
            setChosenOption(item);
            break;

          case "create-option":
            setChosenOption(item);
            break;

          default:
            break;
        }
      }}
    />
  );
};

export default PSelectCreatable;
