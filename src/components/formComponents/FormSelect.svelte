<script
  lang="ts"
  generics="
  Option extends { label: string; value: string }, 
  Options extends readonly Option[], 
  Value extends Options[number]['value']
  "
>
  type FormInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    options: Options;
    value?: Value;
    onselect: (value: Value) => void;
  };
  let { name, label, placeholder, options, value, onselect }: FormInputProps =
    $props();
  let id = $props.id();

  const getSelectedValue = (currentValue?: string) => {
    if (currentValue) {
      return (
        options.find(({ value }) => value === currentValue)?.label ??
        placeholder
      );
    }

    return placeholder;
  };

  let selectedLabel = $state(getSelectedValue(value));

  $effect(() => {
    selectedLabel = getSelectedValue(value);
  });

  let open = $state(false);

  let handleClick = (e: Event) => {
    onselect(
      (e.target as unknown as { dataset: { value: Value } }).dataset.value,
    );
    open = false;
  };
</script>

<fieldset>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <details class="dropdown" {id} aria-label={name} bind:open>
    <summary>{selectedLabel}</summary>
    <ul>
      {#each options as option}
        <li>
          <!-- svelte-ignore a11y_missing_attribute -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <a data-value={option.value} onclick={handleClick}>
            {option.label}
          </a>
        </li>
      {/each}
    </ul>
  </details>
  <small></small>
</fieldset>
