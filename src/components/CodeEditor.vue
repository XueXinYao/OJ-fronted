<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";
const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("hello world");
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
const props = withDefaults(defineProps<Props>(), {
  value: "",
  handleChange: (v: any) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
