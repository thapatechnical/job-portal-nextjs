# React Hook Form Key Concepts

### `useForm`

useForm is the primary hook and the "brain" of your entire form. When you call it, you are initializing a new form instance and getting back an object full of methods and state variables to manage that form.

You are calling useForm() and destructuring four key pieces from it:

### `register`

This is a function you use to "register" your inputs (like `<Input />` and `<Select />`) with `react-hook-form`.

### What `register("name")` does

When you call the `register` function with a field name (like `"name"`, `"email"`, or `"password"`), it does two things:

1.  It tells `react-hook-form`, "Track a field named 'name'."
2.  It returns an object containing all the props needed to control that input.

### `handleSubmit`

This is a crucial wrapper function. You pass your own `onSubmit` function to it.

When the form is submitted, `handleSubmit` first runs your validation (using the `resolver`).

- **If validation fails:** It stops and automatically populates the `errors` object.
- **If validation succeeds:** It calls your `onSubmit` function (the one you defined) and passes it the clean, validated form data.

### `formState: { errors }`

This is an object that contains real-time information about the form's state. You are specifically pulling out (destructuring) the `errors` object.

If your `zodResolver` (or other resolver) finds any validation errors, this `errors` object will be populated with messages from your schema.

### `resolver`

The `resolver` is an option you pass to `useForm` to integrate an external validation library (like Zod, Yup, or Joi).
