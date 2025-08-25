import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/todos")({
  component: Todos,
});

interface todo {
  id: number;
  title: string;
}

function Todos() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((r) => r.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="space-y-2">
      {data.slice(0, 5).map((todo: todo) => (
        <li key={todo.id} className="p-2 border rounded">
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
