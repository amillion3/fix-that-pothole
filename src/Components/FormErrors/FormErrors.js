import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className="formErrors text-center">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <h4 key={i}>{fieldName} {formErrors[fieldName]}</h4>
        );
      } else {
        return '';
      }
    }
    )}
  </div>;
