<template>
<div>
    <div class="threadList">
    <table>
      <thead>
        <tr>
          <th>スレッド名</th>
          <th>作成日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="thread in threadList" :key="thread.id">
          <td>
            <div>
              <router-link :to="thread.id">
                {{ thread.title }}
              </router-link>
            </div>
          </td>
          <td>
            {{ thread.createdAt }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="createThreadForm">
    <form @submit.prevent="onSubmitForm">
      <h3>スレッドを作成する</h3>
      <div>
        <div>
          <label for="title">スレッド名</label>
        </div>
        <input id="title" v-model="createThreadForm.title" />
      </div>
      <div>
        <div>
          <label for="comment">最初のコメント</label>
        </div>
        <textarea id="comment" v-model="createThreadForm.firstComment">
        </textarea>
      </div>
      <input class="button" type="submit" value="送信" />
    </form>
  </div>
</div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "@vue/composition-api";

import { API } from "aws-amplify";
import { byCreatedAt } from "../graphql/queries.js";
import { createComment, createThread } from "../graphql/mutations.js";


export default defineComponent({
  setup() {
    // スレッドの一覧
    const threadList = ref([]);
    // スレッド作成フォーム
    const createThreadForm = reactive({ title: "", firstComment: "" });
    const errorMessage = ref("");

    // スレッド一覧の取得
    const getThreadList = async () => {
      const { data } = await API.graphql({
        query: byCreatedAt,
        variables: { type: "t", sortDirection: "DESC" },
      });
      console.log("getThread : ", data);
      threadList.value = data.byCreatedAt.items;
    };

    // 作成フォームをクリック時の挙動
    const onSubmitForm = async () => {
      // 片方でも空だったら終了
      if (!createThreadForm.title || !createThreadForm.firstComment) return;
      const newThread = await createNewThread();
      await createFirstComment(newThread.id);
      clearForm();
    };

    // スレッドの作成
    const createNewThread = async () => {
      const { data } = await API.graphql({
        query: createThread,
        variables: {
          input: {
            type: "t", // ソートするために同じ値を入れる
            title: createThreadForm.title,
          },
        },
      });
      console.log("createNewThread :", data);
      unshiftThreadToList(data.createThread);
      return data.createThread;
    };

    // スレッド最初のコメントの作成
    const createFirstComment = async (threadId) => {
      const res = await API.graphql({
        query: createComment,
        variables: {
          input: { threadId: threadId, title: createThreadForm.firstComment },
        },
      });
      console.log("createFirstComment :", res);
    };

    // 新しいスレッドをリストの先頭に追加する
    const unshiftThreadToList = (newThread) => {
      threadList.value.unshift(newThread);
    };

    // フォームをクリアする
    const clearForm = () => {
      createThreadForm.title = "";
      createThreadForm.firstComment = "";
    };

    onMounted(getThreadList);

    return { threadList, createThreadForm, errorMessage, onSubmitForm };
  },
});
</script>
