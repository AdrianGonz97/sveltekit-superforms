import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { basicSchema } from './schema';
import { message, superValidate } from '$lib/server';

export const load = async () => {
  const form = await superValidate(basicSchema);

  // Always return { form } in load and form actions.
  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, basicSchema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      return fail(400, { form });
    }

    return message(form, 'Success');
  }
};
