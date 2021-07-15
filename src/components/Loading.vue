<template>
    <q-layout view="hHh lpr fFf">
    <q-header>
      <q-toolbar class="bg-white text-blue-9">
        <q-toolbar-title>
          MiniFuzz
        </q-toolbar-title>

        <q-space/>

        <div class="text-weight-bold">Wait...</div>
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-toolbar class="bg-grey-2 text-grey-9">
        <span class="text-overline text-center q-px-md" style="line-height: 120%;">
          &copy; 2021 Mini-Fuzz, created by Inggris Clesia Clesia Ambesa
        </span>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <q-page class="flex justify-center items-center bg-grey-2">
        <q-circular-progress
          indeterminate
          size="10rem"
          :thickness="0.4"
          color="indigo"
          center-color="grey-8"
          class="q-ma-md"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>