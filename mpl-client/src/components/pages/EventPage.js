import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../context/StoreContext";
import { isAdmin, isPlayer } from "../../util/tokenUtils";

export default function EventPage() {
  const { store, setStore } = useStoreContext();
  const [adminAccess, setAdminAccess] = useState(false);

  useEffect(() => {
    if (store && store.token) {
      setAdminAccess(isAdmin(store.token));
    } else {
      let token = sessionStorage.getItem("token");
      if (token) {
        setStore(token);
        setAdminAccess(isAdmin(token));
      } else {
        setAdminAccess(false);
      }
    }
    // console.log(store);
  }, [store]);
  return (
    <div className="container p-5">
      <h1 className="text-center p-5">Event Dates and Rules</h1>
      <h4 className="text-center">Dates- 21 and 22 January 2023</h4>
      <h1 className="text-center p-5">Tournament Rules Summary</h1>
      <ul className="list-unstyled">
        <li>
          <h4>Match Format</h4>
          <ul type="A">
            <li>
              <p>
                There are 10 teams divided into 2 groups. Each group consists of
                5 teams. Each team will play against 4 other teams in the same
                group. Knock out matches will be followed as per result of the
                league session.
              </p>
              <ol>
                <li>
                  <h6>
                    <strong>Semi final 1: </strong>1st ranked team of group 1 vs
                    2nd ranked team of group 2
                  </h6>
                </li>
                <li>
                  <h6>
                    <strong>Semi final 2: </strong>1st ranked team of group 2 vs
                    2nd ranked team of group 1
                  </h6>
                </li>
                <li>
                  <h6>
                    <strong>Final:</strong> Semi final 1 winning team vs Semi
                    final 2 winning team
                  </h6>
                </li>
              </ol>
            </li>
            <li>Games will be played with Tennis balls.</li>
            <li>
              All matches are slated to start at 08:00 AM sharp to 04:30 PM
            </li>
          </ul>
        </li>
        <li>
          <h4>General Rules</h4>
          <ol type="A">
            <li>
              All the players should wear their own full track-pants and shoes (
              Any football shoes like Studs or Spikes are not allowed). Team
              jerseys will be given at the time of the opening ceremony of the
              tournament (i.e. 21st January, 2023).
              <span className="text-danger">
                Players without team jerseys are not allowed to take the ground.
                Half pants, jeans, bare foot, slippers and sandals are strictly
                prohibited inside the ground.
              </span>
            </li>
            <li>Decisions by on field umpires are final.</li>
            <li>
              Teams will be penalized for disobeying the umpire's decision or
              using any kind of abusive words.
            </li>
          </ol>
        </li>
        <li>
          <h4>Bowling Quota and Rules</h4>
          <ol type="A">
            <li>
              All the league matches will be played in 6 overs.
              <ol>
                <li>Only 2 Bowlers can bowl a maximum of 2 overs per match.</li>
                <li>
                  First 2 overs will be powerplay. Only 2 players can field
                  outside the circle.
                </li>
                <li>
                  For the rest of the overs only 5 players can field outside the
                  circle.
                </li>
              </ol>
            </li>
            <li>
              All the Knockout matches will be played in 8 overs.
              <ol>
                <li>All Bowlers can bowl a maximum of 2 overs per match.</li>
                <li>
                  First 3 overs will be powerplay. Only 2 players can field
                  outside the circle.
                </li>
                <li>
                  For the rest of the overs only 5 players can field outside the
                  circle.
                </li>
              </ol>
            </li>
          </ol>
          <p>
            &emsp;There will be a box at the non-striking end. Bowlers will have
            to bowl standing inside the box but touching the line of any side
            will be called as a NO ball. Only inside that box bowler can take a
            step but after delivering the bowl bowler cannot cross the line if
            the bowler does so that will be considered as NO ball. There will be
            speed limitations for all bowlers. Any bouncer will be considered as
            a no ball.
          </p>
          <p className="text-danger">
            &emsp;There will be BOUNDARY OUT IN ANY NO BALL but for any kind of
            no ball there will be free hit (Note:-Bowled out, Catch out, Stamp
            out will not be given. But run out will be given and for hitting a 6
            there will be no run and no out). Matches will be played only 4s,
            3s, 2s and 1s. 6s are not allowed in any delivery other than
            free-hit (but no run will be given).
          </p>
        </li>
        <li>
          <h4>Match timings and Punctuality</h4>
          &emsp;First match is slated to start at 08:00 a.m. sharp. It is
          expected of all teams to finish an innings in 20 minutes for all the
          matches. There will be a 5 minutes innings break. All the players
          should be available and ready to take the field as soon as possible.
          <ol type="A">
            <li>
              <strong>Penalty for taking the field late</strong>
              <p>
                &emsp;In case one team is not able to take the field due to
                players arriving late the following rule can be used to deduct
                overs.
              </p>
              <ol>
                <li className="text-danger">
                  If a fielding side must be in a position to bowl the first
                  ball of the final over of the innings by the scheduled or
                  rescheduled time(18 mins) for the end of the innings. If they
                  are not in such a position, one fewer fielder will be
                  permitted outside of the circle for the remaining overs of the
                  innings.
                </li>
                <li>
                  <mark>
                    If the batting team delays in sending the next batsman and
                    for wasting time of the opponent team, the batting team will
                    be penalized for -10 runs(i.e. if the batting team scored 40
                    runs in 8 overs then the fielding team will have to score
                    only 31 in 8 overs to win).
                  </mark>
                </li>
              </ol>
            </li>
            <li>
              <strong>Penalty for abusive word in the ground</strong>
              <p>
                &emsp; If any player uses any abusive word towards any players
                or umpires their teams will be penalized for -10 runs while
                defending and +10 runs while chasing
              </p>
            </li>
          </ol>
        </li>
        <li>
          <h4>Prizes/Awards</h4>
          <ol type="A">
            <li>Champion trophy and runner up trophy will be awarded.</li>
            <li>
              Awards will also be presented to each player of the Winning team
              and the Runners up team.
            </li>
            <li>
              Awards will also be presented to the most wicket taker of the
              Tournament, the most run scorer of the tournament and best fielder
              of the tournament.
            </li>
            <li>
              Man of the Match award will be presented only for all the matches.
              Many other individual prizes will be there also.
            </li>
          </ol>
        </li>
      </ul>
      <p className="text-center">
        <strong>
          <i>
            Musketeers Club would like to see players respect the rules and
            participate in true spirit of the game of cricket.
          </i>
        </strong>
      </p>

      {adminAccess ? (
        <>
          <h1 className="text-center p-5">Auction Rules Summary</h1>
          <ul className="list-unstyled">
            <li>
              <h4>MPL 2022 Auction Rules</h4>
              &emsp;The players auction for the 2nd edition of the Musketeers
              Premier League (MPL 2023) is set to take place on January 12, 2023
              and it will decide the fate of the players participating in the
              league. A total of 100 players will be in contention for the spots
              at the auctions. The teams will have to go by the rules set by the
              MPL Committee.
            </li>
            <ul className="mt-2">
              <li>
                <h5>
                  Rule 1 – No buying beyond the allotted Auctions Player Purse:
                </h5>
                &emsp;Teams will have to do shopping for exactly 10 players
                (Excluding captain) from 5 different groups(Group- A, Group- B,
                Group- C, Group- D, Group- E) with the purse limit of 3000
                points. Any player will not be part of any team free. Teams need
                minimum points to build their full squad. Notably, Each team
                must require one player from Group-E.
              </li>
              <li>
                <h5>Rule 2 – Minimum 90% to be spent by each Team:</h5>
                &emsp;As per the MPL Committee ruling, it is mandatory for the
                teams to spend a minimum 90% of the total purse of 3000
                points(i.e. At Least 2700 points to be spent).
              </li>
            </ul>
          </ul>
          <h3>Points increment rules:</h3>
          <h6>10-50: +5</h6>
          <h6>50-200: +10</h6>
          <h6>200-500: +20</h6>
          <h6>500-onwards: +25</h6>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
