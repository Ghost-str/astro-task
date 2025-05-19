<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import FormInput from "./formComponents/FormInput.svelte";
  import FormSelect from "./formComponents/FormSelect.svelte";
  import { actions } from "astro:actions";
  import type { CreateTask } from "../actions/task/createTask";
  import { navigate } from "astro:transitions/client";

  const form = createForm(() => ({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    } as CreateTask,
    onSubmit: async ({ value }) => {
      const result = await actions.task.createTask(value);
      if (result.data) {
        navigate("/");
      }
    },
  }));

  const priorityOptions = [
    {
      label: "Низкий",
      value: "low",
    },
    {
      label: "Средний",
      value: "medium",
    },
    {
      label: "Высокий",
      value: "hight",
    },
  ] as const;
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }}
>
  <form.Field name="title">
    {#snippet children(field)}
      <FormInput
        label="Название задачи"
        name={field.name}
        onblur={field.handleBlur}
        onchange={field.handleChange}
        type="text"
        value={field.state.value}
        errors={field.state.meta.errors}
      />
    {/snippet}
  </form.Field>
  <form.Field name="description">
    {#snippet children(field)}
      <FormInput
        label="Дополнительное описание"
        name={field.name}
        onblur={field.handleBlur}
        onchange={field.handleChange}
        type="textarea"
        value={field.state.value}
        errors={field.state.meta.errors}
      />
    {/snippet}
  </form.Field>
  <form.Field name="priority">
    {#snippet children(field)}
      <FormSelect
        label="Приоритет"
        name={field.name}
        onselect={field.handleChange}
        value={field.state.value}
        options={priorityOptions}
      />
    {/snippet}
  </form.Field>
  <button type="submit">Сохранить</button>
</form>
