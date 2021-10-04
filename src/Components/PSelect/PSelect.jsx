import React from 'react';
import Select from 'react-select';
import './PSelect.scss';

const PSelect = ({
  options,
  chosenOptions,
  setChosenOption,
  inputChange,
  customFilter,
  defaultValue = null,
  placeholder = '',
  multiple = false,
  isClearable = false,
}) => {
  const customStyles = {
    control: () => ({
      display: 'flex',
      backgroundColor: '#FCFCFD',
      borderRadius: 10,
      borderStyle: 'none',
      fontWeight: 600,
      minHeight: 40,
    }),
    menu: () => ({
      backgroundColor: '#FCFCFD',
      borderRadius: 10,
      borderStyle: 'none',
      color: '#CDD1D9',
      marginTop: 10,
    }),
    option: (_, state) => ({
      backgroundColor: state.isFocused ? '#E5E7F3' : '#FCFCFD',
      color: '#35353b',
      fontWeight: 600,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      justifySelf: 'center',
      borderRadius: 10,
    }),
    dropdownIndicator: () => ({
      color: '#35353b',
      marginRight: 10,
      marginLeft: 10,
    }),
    clearIndicator: () => ({
      color: '#35353b',
      marginRight: 10,
      marginLeft: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
    }),
    multiValue: () => ({
      backgroundColor: '#E5E7F3',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      marginTop: 3,
      marginBottom: 3,
      marginRight: 3,
      borderRadius: 10,
      display: 'flex',
      minWidth: 100,
      padding: 10,
    }),
    multiValueLabel: () => ({
      color: '#35353b',
    }),
    menuPortal: () => ({
      backgroundColor: 'green',
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
      placeholder={placeholder || ''}
      value={chosenOptions}
      noOptionsMessage={() => 'No more options'}
      defaultValue={defaultValue || ''}
      onChange={(item, selectAction) => {
        // Get action type
        const { action } = selectAction;
        // If no function provided, return
        if (!setChosenOption) return;

        switch (action) {
          case 'clear':
            setChosenOption(item);
            break;

          case 'select-option':
            setChosenOption(item);
            break;

          case 'remove-value':
            setChosenOption(item);
            break;

          default:
            break;
        }
      }}
    />
  );
};

export default PSelect;
