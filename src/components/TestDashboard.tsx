export function TestDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        🎉 Dashboard Test - Working!
      </h1>
      <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
        <p>If you can see this, the routing and basic rendering is working correctly!</p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Test Card 1</h3>
          <p>This is a test card</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Test Card 2</h3>
          <p>This is another test card</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Test Card 3</h3>
          <p>This is a third test card</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Test Card 4</h3>
          <p>This is a fourth test card</p>
        </div>
      </div>
    </div>
  );
}
