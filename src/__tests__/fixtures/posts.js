export default {
	initial_state: {
		posts: [],
		loading: false,
		error: '',
		com_loading: false,
		com_error: ''
	},
	one_post: [
		[
			{
				userId: 1,
				id: 1,
				comments: [],
				open: false,
				title:
					'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
				body:
					'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
			}
		]
	],
	comments: [
		{
			postId: 1,
			id: 1,
			name: 'id labore ex et quam laborum',
			email: 'Eliseo@gardner.biz',
			body:
				'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium'
		},
		{
			postId: 1,
			id: 2,
			name: 'quo vero reiciendis velit similique earum',
			email: 'Jayne_Kuhic@sydney.com',
			body:
				'est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et'
		}
	]
};
