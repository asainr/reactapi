import Card from 'react-bootstrap/Card';

function Goroutes() {
  document.title = 'Page Not Found';
    return (
    <div>
      <Card className="text-center">
  <Card.Header>Oops!</Card.Header>
  <Card.Body>
    <Card.Title>404 Not Found</Card.Title>
    <Card.Text>
    Sorry, an error has occured, Requested page not found!.
    </Card.Text>
  </Card.Body>
</Card>
</div>
    )
  }
  
  export default Goroutes;
  