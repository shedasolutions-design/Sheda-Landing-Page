---
description: Every way money can move, how disputes are settled, and where AI comes in.
---

# Escrow, disputes and trust

## Money only moves by the rules

On Sheda Solutions, money is never handed to a person and hoped for. It waits in a smart contract, and the contract decides where it goes based on what the parties have done. The table below covers every way a marketplace payment can move.

| Situation                                                    | Where the money goes                                       | Fee  |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ---- |
| Buyer cancels before the seller accepts                      | Back to the buyer, in full                                 | None |
| Offer not accepted within 7 days                             | Expires; the buyer reclaims it in full                     | None |
| Seller rejects the offer, or accepts someone else's          | Back to the buyer, automatically                           | None |
| Buyer cancels after acceptance, before the agreement arrives | Back to the buyer, in full; the property returns to market | None |
| Buyer rejects the agreement and cancels                      | Back to the buyer, in full                                 | None |
| Buyer asks for changes to the agreement                      | Stays in escrow while the seller redrafts                  | None |
| Buyer accepts the agreement                                  | Held for 24 hours, then released to the owner              | 2%   |
| A dispute is raised before release                           | Frozen in escrow until the council rules                   | -    |

Once the buyer accepts the agreement, the deal can't be cancelled: that acceptance is the buyer's commitment. The 24-hour hold exists so that a problem discovered in that window can still be raised as a dispute.

## Inspections before payment

* **Marketplace.** Before accepting any agreement, the buyer books an appointment to inspect the property in person. Sellers publish the days and hours they take appointments; several buyers can ask for the same time, and the seller approves each request or declines it with a suggested time. Contact details are only shared between people with an appointment.
* **Sheda Collections.** The property manager chosen by investors inspects every building phase in person and signs it off on chain. Investors then have 7 days to object before any money reaches the builder. If objections reach 25% of the money in the raise, the payment is held and the build stops.

## Disputes today

1. **Raise.** From the moment an offer is accepted until the payment is released, either side can raise a dispute from the deal, with a reason and supporting evidence.
2. **Freeze.** The payment is frozen in escrow. Neither side can move it.
3. **Review.** The deal's full record is reviewed: the listing, messages, agreement, documents and their on-chain fingerprints, and the inspection history.
4. **Ruling.** The Sheda Solutions council, a multi-signature account where several members must confirm, rules on the outcome: pay the seller, refund the buyer, or split the amount.
5. **Enforcement.** The contract carries out the ruling exactly, and the outcome is recorded on the blockchain.

### Damage deposits

Damage deposits follow their own pre-set rule. When a lease ends, the landlord has 7 days to claim against the deposit for damage beyond what both sides agreed in the rent agreement (normal wear is not damage). If no claim is made, the renter takes the whole deposit back, and nobody can stop it. If a claim is made, it's reviewed, and whatever isn't awarded to the landlord goes back to the renter.

### When a build stops

If a Collections phase is frozen, each investor independently reclaims their share of the money not yet paid to the builder, plus their share of the builder's stake that was set aside as cover. No ruling is needed: the contract does it on each investor's own request.

## Where AI comes in

As the market grows, the volume of disputes will grow with it. Sheda Solutions is building towards **AI-assisted dispute resolution** to settle them faster and more consistently:

* **Mediation.** An AI agent reads the deal's record (agreement, documents, messages, inspection notes and timeline), summarises both sides, and proposes a settlement the parties can accept directly, which the contract then executes.
* **Arbitration support.** Where the parties don't agree, the agent prepares a structured case file and a recommended ruling based on the agreed terms, for the council or a registered human arbitrator to decide.
* **Escalation.** Complex cases always go to people. People make the final call, and the contract enforces it.

## Why this builds trust

* **Fairness is visible.** Both parties know the rules before they pay, and the rules are code.
* **Speed.** Most outcomes need no ruling at all: refunds, expiries and deposit returns happen by rule.
* **Lower cost.** Disputes are settled inside the deal, without courts or lawyers in most cases.
* **A permanent record.** Every action and outcome is recorded on the blockchain.

## Knowing who you deal with

* **Identity checks.** Users can verify their identity with official ID; a verified badge then shows on their profile and listings.
* **Ranks from the record.** Builders' and managers' ranks are computed from their on-chain history (projects finished on time, late or abandoned, stake posted and anything slashed) and need at least 2 finished projects before a rank is shown.
* **Privacy by default.** Email and phone numbers are only shown to someone you have an appointment with. Payment details and schedules are never public.
