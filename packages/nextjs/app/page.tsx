import { Button } from '@lottolotto/ui';
export default async function Index() {
  return (
    <div className="container mx-auto">
      <div className="prose">
        <h1>Hello Lotto Lotto!</h1>
      </div>
      <Button>
        <span className="flex justify-center space-x-2">
          <span>test</span>
          <span>world</span>
        </span>
      </Button>
    </div>
  );
}
