import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

const LoginTerms = () => {
  return (
    <div className="-mt-2">
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox"
          name="terms-checkbox"
          required
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox" className="text-sm">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription className="text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  );
};

export default LoginTerms;
