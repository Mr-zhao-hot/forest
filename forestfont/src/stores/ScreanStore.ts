import { defineStore } from 'pinia'
import { ref } from 'vue'

export const ScreanStore = defineStore('ScreanStore', () => {
  const columns = [
    {
      title: 'Name',  // Changed from 'name' to 'title' to match Ant Design table column definition
      dataIndex: 'name',
      key: 'name',
      width: "30%",
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    }
  ];

  const data = [
    {
      key: '1',
      name: '消防车1',
      tags: ['待出发'],
    },
    {
      key: '2',
      name: '救援车',
      tags: ['待出发'],
    },
    {
      key: '3',
      name: '消防车2',
      tags: ['待出发'],
    },
  ];

  return {
    columns,
    data
  }
})
