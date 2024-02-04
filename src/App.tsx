// Should I explain how I choose tech stack ?

import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import {
  TextField,
  Label,
  Input,
  Text,
  Form,
  FieldError,
} from "react-aria-components";
import axios from "axios";
import logo from "./assets/logo.jpeg";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function App() {
  const [form, setForm] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const emailErrors = useMemo(() => {
    const errors = [];
    const email = form["email"];

    // Simple regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }

    return errors;
  }, [form]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmit(true);
      try {
        const response = await axios.post(
          "https://www.sample.app/login",
          form,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmit(false);
      }
    },
    [form]
  );

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ email: "", password: "" });
  };

  return (
    <section className='h-full py-12 flex flex-col overflow-y-scroll items-center space-y-12'>
      <Form
        className='p-6 w-1/2 border-2 rounded-lg border-white/10'
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className='border-b border-white/10 pb-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-base font-semibold leading-7 text-white'>
                Login Form
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-400'>
                Rush Owl Technical Test
              </p>
            </div>
            <img
              src={logo}
              alt='company logo'
              className='w-12 h-12 rounded-lg'
            />
          </div>

          <div className='border-t border-white/10 mt-3 pt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-6'>
            <TextField
              className='sm:col-span-6'
              isInvalid={emailErrors.length > 0}
            >
              <Label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-white'
              >
                Email address
              </Label>
              <div className='mt-2'>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  value={form["email"]}
                  onChange={handleChange}
                />
              </div>
              <FieldError className='text-sm text-red-600'>
                <ul role='list' className='list-disc space-y-1 pl-5 mt-2'>
                  {emailErrors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </FieldError>
            </TextField>
            <TextField className='sm:col-span-6' type='password'>
              <Label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-white'
              >
                Password
              </Label>
              <div className='mt-2'>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  value={form["password"]}
                  onChange={handleChange}
                />
              </div>
              <Text
                slot='description'
                className='block text-xs font-medium leading-6 text-slate-200'
              >
                Password must be at least 8 characters.
              </Text>
            </TextField>
          </div>
        </div>

        <div className='mt-3 flex items-center justify-end gap-x-6'>
          <button
            type='reset'
            className='text-sm font-semibold leading-6 text-white'
          >
            Reset
          </button>
          <button
            disabled={isSubmit}
            type='submit'
            className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 min-w-20 flex justify-center text-center'
          >
            {isSubmit ? (
              <ArrowPathIcon className='h-5 w-5 animate-spin' />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </Form>

      <pre className='p-6 w-1/2 border-2 rounded-lg border-white/10 text-slate-100'>
        {`
  function calculateMinMax(arrays: number[][]): number {
    // Map each nested array to its maximum value
    const maxValues = arrays.map(array => Math.max(...array));
    
    // Find the minimum value among the maximum values
    return Math.min(...maxValues);
    }`}
      </pre>

      <article className='p-10 w-1/2 border-2 rounded-lg border-white/10 text-slate-300 space-y-3 text-sm'>
        <p>
          When discussing the differences in runtime behavior between React for
          web applications and React Native for mobile applications, it's
          crucial to clarify that both use React as the core library for
          building user interfaces. The more direct comparison should be between{" "}
          <code>react-dom</code> and <code>react-native</code>. React serves as
          the foundation, offering a component-based architecture for developing
          user interfaces, while <code>react-dom</code> and{" "}
          <code>react-native</code> are specific to their respective platforms,
          handling the rendering of those components.
        </p>
        <p>
          React, at its core, is a JavaScript library designed to simplify the
          creation of interactive UIs. Developers define components as reusable
          pieces of UI, which React then renders based on the current state and
          props. For web development, React components are translated into HTML
          elements that can be rendered in a web browser. This process is
          managed by <code>react-dom</code>, which also optimizes updates to the
          DOM to ensure high performance, leveraging a virtual DOM to minimize
          direct manipulations of the actual DOM.
        </p>
        <p>
          React Native, on the other hand, extends React's component-based model
          to mobile app development, allowing developers to write applications
          in JavaScript that render to native platform components. Unlike{" "}
          <code>react-dom</code> which outputs to HTML,{" "}
          <code>react-native</code> maps React components to equivalent native
          views for iOS and Android. This approach enables apps built with React
          Native to have the performance and look-and-feel of native apps, while
          still benefiting from the flexibility and efficiency of React's
          development model.
        </p>
        <p>
          <code>React-dom</code> is specifically tailored for web applications,
          translating React components into DOM elements. During runtime,{" "}
          <code>react-dom</code> efficiently updates the browser's DOM to
          reflect the current state of the components, using React's virtual DOM
          to optimize these updates. This process ensures that web applications
          built with React are fast and responsive, even with complex UIs and
          large amounts of data. The styling of these components typically
          involves CSS, which can be applied in various ways, including
          traditional stylesheets, inline styles, or CSS-in-JS libraries.
        </p>
        <p>
          In conclusion, while both <code>react-dom</code> and{" "}
          <code>react-native</code> build on the same foundational principles of
          React, they cater to different platforms with distinct runtime
          behaviors. <code>React-dom</code> focuses on rendering components to
          the web's DOM, enabling the development of dynamic web applications
          with React. In contrast, <code>react-native</code> targets mobile
          platforms, translating React components into native mobile UI elements
          for iOS and Android, allowing developers to create mobile apps that
          combine the best of native development and React's powerful UI
          abstraction. This distinction highlights the versatility of React as a
          UI library, adaptable to various platforms while maintaining a
          consistent development experience.
        </p>
      </article>
    </section>
  );
}
