# filter by age under 30
youngcan_under30 <- cdem2021data %>% filter(cps21_age < 30)

# demographics:
cps21_ResponseId, cps21_age, cps21_education, cps21_employment, cps21_religion, cps21_bornin_canada

# political interest
cps21_interest_gen_1, cps21_interest_elxn_1, 

# likely to vote
cps21_v_likely

# news consumption
cps21_news_cons

# politcal participation
cps21_volunteer

# duty to vote
cps21_duty_choice

# talk about politics
cps21_talkpolitics

# province 
pes21_province

# turnout and vote choice
pes21_turnout2021, pes21_notvotereason1, pes21_howvote, pes21_votechoice2021

# political participation
pes21_partic1, pes21_partic2, pes21_partic3

# follow politics
pes21_follow_pol

# internet
pes21_internetvote1, pes21_internetvote2

# select columns
youngcan_under30_filtered <- youngcan_under30 %>% select(cps21_ResponseId, cps21_age, cps21_education, cps21_employment, cps21_religion, cps21_bornin_canada, cps21_interest_gen_1, cps21_interest_elxn_1, cps21_v_likely, cps21_news_cons, cps21_volunteer, cps21_duty_choice, pes21_province,pes21_turnout2021, pes21_notvotereason1, pes21_howvote, pes21_votechoice2021, pes21_follow_pol,pes21_internetvote1, pes21_internetvote2)

# create plot of voter turnout
ggplot(youth_data, aes(x = factor(pes21_tur  out2021))) +
  geom_bar(fill = "skyblue", color = "black") +
  labs(
    title = "Youth Turnout (18-29) in 2021 Election",
    x = "Turnout Response (1-7)",
    y = "Count"
  ) +
  theme_minimal()

# plot by education
ggplot(youngcan_under30_filtered, aes(x = factor(cps21_education))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "18-29 Education Levels in CES2021",
         x = "Education Level",
         y = "Count"
     ) +
     theme_minimal()

# plot by poltical interest
ggplot(youngcan_under30_filtered, aes(x = factor(cps21_interest_gen_1))) +
    geom_bar(fill = "skyblue", color = "black") +
    labs(
        title = "Age 18-29 Politcal Interest in CES2021",
        x = "Interest Scale",
        y = "Count"
    ) +
    theme_minimal()

# plot by likeliness to vote pre-election
ggplot(youngcan_under30_filtered, aes(x = factor(cps21_v_likely))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "Age 18-29 Likely to Vote Pre-Election in CES2021",
         x = "Likely to Vote",
         y = "Count"
     ) +
     theme_minimal()

# plot by news consumption
ggplot(youngcan_under30_filtered, aes(x = factor(cps21_news_cons))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "Age 18-29 News Consumption in CES2021",
         x = "Likely to Vote",
         y = "Count"
     ) +
     theme_minimal()

# plot by follows politics
ggplot(youngcan_under30_filtered, aes(x = factor(pes21_follow_pol))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "Age 18-29 Follows Politics in CES2021",
         x = "Follow Politics Scale",
         y = "Count"
     ) +
     theme_minimal()

# plot by duty or choice to vote
ggplot(youngcan_under30_filtered, aes(x = factor(cps21_duty_choice))) +
    geom_bar(fill = "skyblue", color = "black") +
    labs(
        title = "Age 18-29 Duty or Choice to Vote in CES2021",
        x = "1-Duty 2-Choice",
        y = "Count"
    ) +
    theme_minimal()

# plot by internet choice 1
ggplot(youngcan_under30_filtered, aes(x = factor(pes21_internetvote1))) +
    geom_bar(fill = "skyblue", color = "black") +
    labs(
        title = "Age 18-29 Option to Vote on Internet in CES2021",
        x = "1 - Disagree to Agree - 5",
        y = "Count"
    ) +
    theme_minimal()

# plot by internet choice 2
ggplot(youngcan_under30_filtered, aes(x = factor(pes21_internetvote1))) +
    geom_bar(fill = "skyblue", color = "black") +
    labs(
        title = "Age 18-29 Option to Vote on Internet in CES2021",
        x = "1 - Disagree to Agree - 5",
        y = "Count"
    ) +
    theme_minimal()

# plot by reason of not voting
ggplot(youngcan_under30_filtered, aes(x = factor(pes21_notvotereason1))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "Age 18-29 Reason for Not Voting in CES2021",
         x = "Reason for Not Voting",
         y = "Count"
     ) +
     theme_minimal()

# plot not voting without na values
youngcan_under30_filtered %>%
  filter(!is.na(pes21_notvotereason1)) %>%
  ggplot(aes(x = factor(pes21_notvotereason1))) +
  geom_bar(fill = "skyblue", color = "black") +
  labs(
    title = "Age 18-29 Reason for Not Voting in CES2021",
    x = "Reason for Not Voting",
    y = "Count"
  ) +
  theme_minimal()

# plot by vote choice
ggplot(youngcan_under30_filtered, aes(x = factor(pes21_votechoice2021))) +
     geom_bar(fill = "skyblue", color = "black") +
     labs(
         title = "Age 18-29 Vote Choice in CES2021",
         x = "Vote Choice",
         y = "Count"
     ) +
     theme_minimal()


# select wanted columns 
ces2021_filtered_data <- cdem2021data %>% select(where(~n_distinct(.) <= 10))