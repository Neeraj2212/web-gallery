import { Nav, Navbar, Button } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header() {
	const [session, loading] = useSession();
	return (
		<div className="container">
			<Navbar collapseOnSelect expand="md" variant="light">
				<Navbar.Brand href="#home">Web Gallary</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						{!session && (
							<a
								href="/api/auth/signin"
								onClick={(e) => {
									e.preventDefault();
									signIn();
								}}
							>
								<Button className="ml-auto " variant="dark">
									Sign in
								</Button>
							</a>
						)}
						{session && (
							<>
								<Nav.Link>
									<span
										style={{
											backgroundImage: `url(${session.user.image})`,
										}}
										className="avatar"
									/>
								</Nav.Link>

								<Nav.Link className="email">{session.user.email}</Nav.Link>
								<a
									href="/api/auth/signout"
									onClick={(e) => {
										signOut();
									}}
								>
									<Button className="ml-auto" variant="danger">
										Sign out
									</Button>
								</a>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<style jsx>{`
				.avatar {
					border-radius: 2rem;
					float: left;
					height: 2.2rem;
					width: 2.2rem;
					background-color: white;
					background-size: cover;
					border: 2px solid #ddd;
				}
				.nav-link,
				a {
					display: flex;
					align-items: center;
				}
			`}</style>
		</div>
	);
}
