import { useEffect, useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccount, updateAccount } from "../api/account";
import { getCard } from "../api/card";
import { AccountRes, BannerRes, CardRes } from "../api/model";
import { getBanner } from "../api/auth";

const BankMain = () => {
	const [accountData, setAccountData] = useState<AccountRes | null>(null);
	const [cardData, setCardData] = useState<CardRes | null>(null);
	const [bannerData, setBannerData] = useState<BannerRes | null>(null);
	const [showBalance, setShowBalance] = useState(false);
	const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

	const navigate = useNavigate();
	const authToken = localStorage.getItem("authToken");
	const location = useLocation();
	const { verifyRes } = location.state || {};

	const mainAccounts =
		accountData?.accounts.filter((acc) => acc.isMainAccount) || [];
	const normalAccounts =
		accountData?.accounts.filter((acc) => !acc.isMainAccount) || [];

	const handleClose = () => {
		localStorage.clear();
		navigate("/");
	};

	const toggleTooltip = (accountId: string) => {
		setOpenTooltipId(prev => (prev === accountId ? null : accountId));
	};

	const toggleBalance = () => {
		setShowBalance((prev) => !prev);
	};

	const setMainAccount = async (accountId: string) => {
		if (!authToken) return;
		try {
			await updateAccount(accountId, true, "", authToken);
			const updated = await getAccount(authToken);
			setAccountData(updated);
			setOpenTooltipId(null);
		} catch (err) {
			console.error("Failed to set main account:", err);
		}
	};

	const setColor = async (accountId: string) => {
		if (!authToken) return;
		const color = prompt("Enter new account color (hex code like #24c875):");
		if (!color) return;

		try {
			await updateAccount(accountId, false, color, authToken);
			const updated = await getAccount(authToken);
			setAccountData(updated);
			setOpenTooltipId(null);
		} catch (err) {
			console.error("Failed to update name/color:", err);
		}
	};

	useEffect(() => {
		if (authToken) {
			const fetchData = async () => {
				const accountRes = await getAccount(authToken)
					.then((res) => {
						return res;
					})
					.catch((err) => {
						console.error("Failed to fetch account:", err);
						return null;
					});
				setAccountData(accountRes);

				const cardRes = await getCard(authToken)
					.then((res) => {
						return res;
					})
					.catch((err) => {
						console.error("Failed to fetch card data:", err);
						return null;
					});
				setCardData(cardRes);

				const bannerRes = await getBanner(authToken)
					.then((res) => {
						return res;
					})
					.catch((err) => {
						console.error("Failed to fetch banner data:", err);
						return null;
					});
				setBannerData(bannerRes);
			};
			fetchData();
		}
	}, [authToken]);

	return (
		<div className="wrap" onClick={() => setOpenTooltipId(null)}>
			<header className="header ">
				<button className="header__lft header__menu">
					<span className="blind">Menu</span>
				</button>
				<button
					type="button"
					className="header__rgt header__cxl"
					onClick={handleClose}
				>
					<span className="blind">Cancel</span>
				</button>
			</header>

			<main className="container container--main">
				<div className="content_wrap">
					<div className="main-top">
						<h1 className="main-top__tit main-loading main-loading--order1">
							{verifyRes.greetingMsg}
						</h1>
					</div>
					{mainAccounts?.map((account) => (
						<div
							key={account.accountId}
							className="main-acc main-acc--large main-loading main-loading--order3"
							style={{ background: account.color }}
						>
							<div className="main-acc__top">
								<h2 className="main-acc__name">{account.type}</h2>
								<span className="main-acc__amount">
									฿
									{account.amount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
								<span className="main-acc__detail main-acc__detail--num">
									Smart account {account.accountNumber}
								</span>
								<span className="main-acc__detail">
									Powered by {account.issuer}
								</span>
							</div>

							<div className="main-acc__bottom">
								<div className="main-acc__ani_box" >
									<div className="main-acc__ani__item" >
										<span className="main-acc__ani_img1"></span>
										<span className="main-acc__ani_img2"></span>
									</div>
									<div className="main-acc__ani__item2">
										<span className="main-acc__ani_img3"></span>
									</div>
								</div>
								<div className="main-acc__link__box" style={{ background: account.color }}>
									<div className="main-acc__link__item" >
										<button className="main-acc__link main-acc__link--withdrawal">
											Withdrawal
										</button>
										<button className="main-acc__link main-acc__link--qr">
											QR scan
										</button>
										<button className="main-acc__link main-acc__link--addmoney">
											Add money
										</button>
									</div>
								</div>
							</div>
							<button type="button" className="main-acc__more" onClick={(e) => {
								e.stopPropagation();
								toggleTooltip(account.accountId)
							}}>
								<span className="blind">More Action</span>
							</button>
							<div className="tooltip " style={{ display: openTooltipId === account.accountId ? "block" : "none" }}>
								<button type="button" className="tooltip__btn-more">
									Copy account number
								</button>

								<button type="button" className="tooltip__btn-more" onClick={() => setColor(account.accountId)}>
									Edit Color
								</button>
							</div>
							<div
								className="tooltip tooltip--bubble tooltip--right-under"
								style={{ display: "none" }}
							>
								<span className="tooltip__txt">
									Change your main account for <br />
									Using transfer, Wallet more easliy
								</span>
							</div>
						</div>
					))}

					{/*round button group*/}
					{/* <div className="rctly__wrap main-loading main-loading--order5">
					<ul className="rctly__lst">
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">Emily</span>
							</button>
						</li>
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb is-bank"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">AbcdEfghiJKlmN</span>
							</button>
						</li>
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">Jone Kiersten</span>
							</button>
						</li>
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">Emily</span>
							</button>
						</li>
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">Emily</span>
							</button>
						</li>
						<li className="rctly__item">
							<button className="rctly__link">
								<span className="rctly__thumb is-bank"><img src="https://dummyimage.com/54x54/999/fff"
										alt=""/></span>
								<span className="rctly__name">MarkYu Gonzales</span>
							</button>
						</li>
						
					</ul>
				</div> */}

					{/*make debit button group*/}
					{/* <button className="main-make main-loading main-loading--order6" style={{display: "none"}}>
					<span className="main-make__img"><img src="../img/main/img-debitcard-make.png" alt=""/></span>
					<strong className="main-make__tit">Make your Debit Card</strong>
					<p className="main-make__dsc">To enjoy 0.5% cash back from online perchase.</p>
				</button> */}

					<div className="debit-swipe__wrap main-loading main-loading--order6">
						<div className="debit-swipe__inner">
							<div className="debit-swipe__lst" style={{ width: "1595px" }}>
								{cardData?.cards.map((card) => (
									<button
										key={card.cardId}
										className={`debit-swipe__item ${card.status !== "Active" ? "card--inactive" : ""
											}`}
										style={{
											color: "#ffffff",
											backgroundColor: card.color,
											borderColor: card.borderColor,
										}}
									>
										<strong className="debit-swipe__name">{card.name}</strong>
										<span className="debit-swipe__etc">
											<span className="debit-swipe__etc__num">
												{card.number}
											</span>
										</span>
										<br />
										<span
											className="debit-swipe__issue"
											style={{ color: "#ffffff" }}
										>
											Issued by {card.issuer}
										</span>
									</button>
								))}
								<button className="debit-swipe__item debit-swipe__item--all">
									See all
								</button>
							</div>
						</div>
					</div>

					{/* <div className="main-acc is-bluegreen is-small">
			<div className="main-acc__top">
			<h2 className="main-acc__name">Saving Account</h2>
			<span className="main-acc__amount">฿8,837,999.00</span>
			</div>
			<div className="main-acc__bottom">
			<span className="main-acc__detail">
				Smart account 568-2-81740-9
			</span>
			<span className="main-acc__detail">Powered by TestLab</span>
			</div>
			<button
			type="button"
			className="main-acc__more main-acc__more--small"
			>
			<span className="blind">More Action</span>
			</button>
			<div className="tooltip tooltip--sub-acc">
			<button type="button" className="tooltip__btn-more">
				Copy account number
			</button>
			<button type="button" className="tooltip__btn-more">
				Edit Name and Color
			</button>
			</div>
			<button className="main-acc__act main-acc__act--money">
			<span className="blind">Add money</span>
			</button>
		</div> */}

					{/* <div className="main-acc is-orange is-small">
			<div className="main-acc__top">
			<h2 className="main-acc__name">Credit Loan</h2>
			<span className="main-acc__amount">฿300.100</span>
			</div>
			<div className="main-acc__bottom">
			<span className="main-acc__detail">
				Credit Loan 568-2-81740-9
			</span>
			</div>
			<button
			type="button"
			className="main-acc__more main-acc__more--small"
			>
			<span className="blind">More Action</span>
			</button>
			<div
			className="tooltip tooltip--sub-acc"
			style={{ display: "none" }}
			>
			<button type="button" className="tooltip__btn-more">
				Copy account number
			</button>

			<button type="button" className="tooltip__btn-more">
				Edit Name and Color
			</button>
			</div>
			<button className="main-acc__act main-acc__act--disburse">
			<span className="blind">Disburse</span>
			</button>
		</div> */}

					{normalAccounts?.map((account) => (
						<div key={account.accountId} className="main-acc is-small" style={{ background: account.color }}>
							<div className="main-acc__top">
								<h2 className="main-acc__name">{account.type}</h2>
								<span className="main-acc__amount">฿
									{account.amount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
								{account.flags.map((flag) => (
									<span key={flag.flagId} className="main-acc__flag">{flag.flagValue}</span>
								))}
							</div>
							<div className="main-acc__bottom">
								<span className="main-acc__detail">
									Goal driven savings {account.accountNumber}
								</span>
								<span className="main-acc__detail">Powered by {account.issuer}</span>
							</div>
							<button
								type="button"
								className="main-acc__more main-acc__more--small"
								onClick={(e) => {
									e.stopPropagation();
									toggleTooltip(account.accountId)
								}}
							>
								<span className="blind">More Action</span>
							</button>
							<div
								className="tooltip tooltip--sub-acc"
								style={{ display: openTooltipId === account.accountId ? "block" : "none" }}
							>
								<button type="button" className="tooltip__btn-more" onClick={() => setMainAccount(account.accountId)}>
									Set main account
								</button>
								<button type="button" className="tooltip__btn-more">
									Copy account number
								</button>

								<button type="button" className="tooltip__btn-more" onClick={() => setColor(account.accountId)}>
									Edit Color
								</button>
							</div>
							<div className="main-acc__circle">
								<svg
									className="graph-bar"
									width="100%"
									height="100%"
									viewBox="0 0 42 42"
								>
									<circle
										cx="21"
										cy="21"
										r="15.91549430918954"
										fill="transparent"
										stroke="rgba(0,0,0,0.07)"
										strokeWidth="1.5"
									></circle>
									<circle
										className="gauge"
										cx="21"
										cy="21"
										r="15.91549430918954"
										fill="transparent"
										stroke="#fff"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeDashoffset="25"
										style={{ strokeDasharray: "24 76" }}
									></circle>
								</svg>
								<div className="main-acc__num">
									<span className="percent">{account.progress}</span>
									<span className="unit">%</span>
								</div>
							</div>
						</div>
					))}
					{/* <div className="main-acc is-deepblue is-small">
            <div className="main-acc__top">
              <h2 className="main-acc__name">Need to repay</h2>
              <span className="main-acc__amount">฿30,000.00</span>
              <span className="main-acc__flag main-acc__flag--lock">
                Disbursement
              </span>
              <span className="main-acc__flag">Overdue</span>
            </div>
            <div className="main-acc__bottom">
              <span className="main-acc__detail">
                Credit Loan 568-2-81740-9
              </span>
            </div>
            <button
              type="button"
              className="main-acc__more main-acc__more--small"
            >
              <span className="blind">More Action</span>
            </button>
            <div
              className="tooltip tooltip--sub-acc"
              style={{ display: "none" }}
            >
              <button type="button" className="tooltip__btn-more">
                Copy account number
              </button>

              <button type="button" className="tooltip__btn-more">
                Edit Name and Color
              </button>
            </div>
            <button className="main-acc__act main-acc__act--pay">
              <span className="blind">Pay</span>
            </button>
          </div> */}
					<button className="main-prod">
						<span className="main-prod__cms-ico">
							<img src={bannerData?.image} alt="" />
						</span>
						<strong className="main-prod__tit">{bannerData?.title}</strong>
						<p className="main-prod__dsc">{bannerData?.description}</p>
					</button>

					<div className="main-tb">
						<button className="link-to" onClick={toggleBalance}>
							{showBalance ? "Hide Total Balance" : "Show Total Balance"}
						</button>
						{showBalance && (
							<div className="total-balance">
								<p style={{ fontWeight: "400", fontSize: "2rem" }}>
									{accountData?.totalBalance.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}{" "}
									THB
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default BankMain;
