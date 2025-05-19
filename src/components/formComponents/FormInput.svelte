<script lang="ts">
  type FormInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    errors?: any[];
    type: "text" | "textarea";
    value: string | undefined;
    onchange: (newValue: string) => void;
    onblur: () => void;
  };
  let { name, label, onchange, onblur, value, type }: FormInputProps = $props();
  let id = $props.id();
</script>

<fieldset>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  {#if type === "text"}
    <input
      {id}
      {name}
      onchange={(e) => onchange((e.target as HTMLInputElement).value)}
      onblur={() => onblur()}
      {value}
    />
  {/if}
  {#if type === "textarea"}
    <textarea
      onchange={(e) => onchange((e.target as HTMLTextAreaElement).value)}
      onblur={() => onblur()}
      {id}
      {name}
    >
      {value}
    </textarea>
  {/if}
  <small></small>
</fieldset>
